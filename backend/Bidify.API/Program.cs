using Bidify.API.Core.Enum;
using Bidify.API.Core.Interfaces;
using Bidify.API.Core.Services;
using Bidify.API.Data;
using Bidify.API.Data.Entities;
using Bidify.API.Data.Interfaces;
using Bidify.API.Data.Repo;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddCors();

builder.Services.AddSwaggerGen(opt =>
{
    opt.EnableAnnotations();
});

builder.Services.AddDbContext<BidifyDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

builder.Services.AddScoped<IUserRepo, UserRepo>();
builder.Services.AddScoped<IAuctionRepo, AuctionRepo>();
builder.Services.AddScoped<IBidRepo, BidRepo>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IAuthService, AuthService>();




builder.Services.AddAuthentication(opt =>
{
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})

.AddJwtBearer(opt =>
{
    opt.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,

        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],

        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])
        )
    };
});

builder.Services.AddAuthorization();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<BidifyDbContext>();

    if (!context.Users.Any(u => u.Role == UserRole.Admin))
    {
        var admin = new User
        {
            Username = "admin",
            Email = "admin@bidify.com",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin123!"),
            Role = UserRole.Admin,
            IsActive = true
        };

        context.Users.Add(admin);
        context.SaveChanges();
    }
}


app.UseRouting();

app.UseCors(options =>
    options.AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod()
);

app.UseAuthentication();  
app.UseAuthorization();    

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();
