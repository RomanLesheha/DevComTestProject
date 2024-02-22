namespace TestProject.Models
{
    public class Paper
    {
        public int Rows { get; set; }
        public int Columns { get; set; }
        public List<Cell> RemovedCells { get; set; }

        public List<Cell> RemainingCells { get; set; }
    }
    public class Cell
    {
        public Cell(int X, int Y)
        {
            this.X = X;
            this.Y = Y;
        }

        public int X { get; set; }
        public int Y { get; set; }

        public override bool Equals(object obj)
        {
            if (obj == null || !GetType().Equals(obj.GetType()))
            {
                return false;
            }

            Cell other = (Cell)obj;
            return X == other.X && Y == other.Y;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(X, Y);
        }
    }
}
