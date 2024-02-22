using TestProject.Models;

namespace TestProject.Interfaces
{
    public interface IPaperDivider
    {
        List<List<Cell>> CountIndependentAreas(Paper paper);
    }
}
