TestProject /n
Завдання виконане за допомогою ASP.NET MVC. Весь алгоритм написаний на C# , верстка HTML CSS , функціонал View написаний на JS.
Логіка всієї програми описана у класі PaperDivider.
  Використовується наступний алгоритм, спочатку у мене є метод, який приймає із View клас Paper, який містить поля Rows та Columns , та масив видалений та невидалених точок List<Cell> RemovedCells і List<Cell> RemainingCells відповідно. Далі у цьому методі я створюю Ліст масивів independentAreas, у якому будуть зберігатися усі точки різних незалежних областей, створюю допоміжний масив відвіданих точок , та подвійним циклом пробігаюсь по кожній точці і якщо вона не відвідана, або невидалена , то я ствоюю перший масив , та добавляю його в independentAreas, наступний крок, це метод ExploreArea , який шукає сусідів поточної точки.
Цей метод спочатку відмічає поточну точку як відвідану, добавляє першу точку в масив , а далі задопомогою вкладеного циклу шукає усіх сусідів цієї точки і перевіряє чи вони невідвідані та чи існують, якщо так , то рекусивно знову викликаю цей метод , але вже із іншою поточкою точкою.
  Таким чином я отримаю певну кількість масивів точок, які незалежні один від одних.
Отже весь функціонал Ви зможете переглянути, якщо зайдете на сторінку Paper
 ![image](https://github.com/RomanLesheha/DevComTestProject/assets/100034791/85e2ceb6-9bdf-4bbc-add8-2740df8e50d8)
 
Тут є три кнопки, першою Ви зможете змінити розмірність листка паперу, друга кнопка вмикає редагування, можете як і просто натискати на клітинки, так і зажати мишку і тягнути, і всі клітинки на які потрапила мишка будуть видалятися, і остання кнопка звісно вираховує кількість незалежних частин, на які розбився аркуш паперу.
