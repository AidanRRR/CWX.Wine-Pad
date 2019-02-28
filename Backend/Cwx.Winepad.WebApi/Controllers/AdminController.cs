﻿using System.Threading.Tasks;
using Cwx.Winepad.Domain.Admin.Features;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Cwx.Winepad.WebApi.Controllers
{
    public class AdminController : Controller
    {
        private readonly IMediator _mediator;

        public AdminController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("admins")]
        public Task<GetAdmins.Response> GetAdmins() => _mediator.Send(new GetAdmins.Request());
    }
}