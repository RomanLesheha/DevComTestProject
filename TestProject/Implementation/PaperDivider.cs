using System.Diagnostics;
using TestProject.Interfaces;
using TestProject.Models;

namespace TestProject.Implementation
{
    public class PaperDivider : IPaperDivider
    {
        public List<List<Cell>> CountIndependentAreas(Paper paper)
        {
            var independentAreas = new List<List<Cell>>();
            // Створення копії сітки для визначення відвіданих клітинок
            bool[,] visited = new bool[paper.Columns, paper.Rows];
            // Пошук незалежних областей
            for (int i = 0; i < paper.Columns; i++)
            {
                for (int j = 0; j < paper.Rows; j++)
                {
                    if (!paper.RemovedCells.Contains(new Cell(i, j)) && !visited[i, j])
                    {
                        var area = new List<Cell>();
                        independentAreas.Add(area);
                        ExploreArea(paper, visited, i, j, area);
                    }
                }
            }
            return independentAreas;
        }

        private void ExploreArea(Paper paper, bool[,] visited, int column, int row, List<Cell> area)
        {
            // Позначення поточної клітинки як відвіданої
            visited[column, row] = true;

            area.Add(new Cell(column, row));
            // Перевірка сусідів клітинки
            for (int i = -1; i <= 1; i++)
            {
                for (int j = -1; j <= 1; j++)
                {
                    int newColumn = column + i;
                    int newRow = row + j;

                    // Перевірка валідності індексів та відвіданості клітинки
                    if (newColumn >= 0 && newColumn < paper.Columns &&
                        newRow >= 0 && newRow < paper.Rows &&
                        !visited[newColumn, newRow] &&
                        !paper.RemovedCells.Exists(cell => cell.X == newColumn && cell.Y == newRow))
                    {
                        ExploreArea(paper, visited, newColumn, newRow, area);
                    }
                }
            }
        }

    }
}
