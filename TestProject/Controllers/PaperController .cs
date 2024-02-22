using Microsoft.AspNetCore.Mvc;
using TestProject.Interfaces;
using TestProject.Models;

namespace TestProject.Controllers
{
    public class PaperController : Controller
    {
        private readonly IPaperDivider _paperDivider;
        public PaperController(IPaperDivider paperDivider) {
            _paperDivider = paperDivider;
        }
        public IActionResult Index()
        {
            //створення дефолткого шаблону 50на50
            var paper = new Paper
            {
                Rows = 25,
                Columns = 25,
                RemovedCells = new List<Cell>()
            };
            return View(paper);
        }

        [HttpPost]
        public async Task<List<List<Cell>>> SaveCells([FromBody] Paper paper)
        {
            if (paper == null || paper.RemovedCells == null)
            {
                return new List<List<Cell>>();
            }

            int remainingCellsCount = (paper.Rows * paper.Columns) - paper.RemovedCells.Count;

            if (remainingCellsCount == 0 || remainingCellsCount == paper.Rows * paper.Columns)
            {
                return new List<List<Cell>>();
            }

            return _paperDivider.CountIndependentAreas(paper);
        }
    }
}