using Microsoft.EntityFrameworkCore;

namespace Cwx.Winepad.Domain.Country.Features
{
    public class AddCountry
    {
        private readonly DbContext _dbContext;

        public AddCountry(DbContext dbContext)
        {
            _dbContext = dbContext;
        }
    }
}