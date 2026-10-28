const button = document.getElementById("add_expense");
let totalSpent = 0;
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const expensesList = document.getElementById("expenses_list");
const expensesTotal = document.getElementById("total");

totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
expensesTotal.textContent = `Total spent: ${totalSpent} UAH`;

for (const item of expenses) {
    const expense = document.createElement("p");
    expense.textContent = `${item.category} - ${item.amount} UAH`;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function() {
    expenses = expenses.filter(exp => exp !== item);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    totalSpent -= item.amount;
    expensesTotal.textContent = `Total spent: ${totalSpent} UAH`;
    expense.remove();
});
    expense.appendChild(deleteButton);
    expensesList.appendChild(expense);
}

button.addEventListener("click", function() {
    const expensesTotal = document.getElementById("total");
    const amountInput = document.getElementById("amount");
    const categoryInput = document.getElementById("category");
    const amount = Number(amountInput.value);
    const category = categoryInput.value.trim();
    if (amount > 0 && categoryInput.value.trim() !== "") {
        const newExpense = { amount: amount, category: category };
        expenses.push(newExpense);
        localStorage.setItem("expenses", JSON.stringify(expenses));
        totalSpent += amount;
        expensesTotal.textContent = `Total spent: ${totalSpent} UAH`;
        const expense = document.createElement("p");
        expense.textContent = `${category} - ${amount} UAH`;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function(){
            expenses = expenses.filter(exp => exp !== newExpense);
            localStorage.setItem("expenses", JSON.stringify(expenses));
            totalSpent -= newExpense.amount;
            expensesTotal.textContent = `Total spent: ${totalSpent} UAH`;
            expense.remove();
        });

        expense.appendChild(deleteButton);
        expensesList.appendChild(expense)
        amountInput.value = "";
        categoryInput.value = "";
    }else {
        alert("Please enter an amount and a category!")
    }
})