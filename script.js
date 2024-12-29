document.addEventListener('DOMContentLoaded',()=>{
    const formContainer = document.getElementById('form-container');
    const expenseInput = document.getElementById('expense-input');
    const amountInput = document.getElementById('amount-input');
    const itemContainer = document.getElementById('item-container');
    const totalExpenses = document.getElementById('total-expenses');

    let expenses= JSON.parse(localStorage.getItem("expenses")) ||[];

    renderExpenses();
    formContainer.addEventListener('submit',(e)=>{
        e.preventDefault();
        const expenseName = expenseInput.value.trim();
        const expenseAmount = parseFloat(amountInput.value);
        if(expenseAmount>0){
          expenseInput.value = "";
          amountInput.value = "";
          const newExpenses = {
            id: Date.now(),
            name: expenseName,
            amount: expenseAmount,
          };

          expenses.push(newExpenses);
          saveExpenses();
          renderExpenses();
        }else{
            alert("Amount should be greater than 0");
        }
    });

    function renderExpenses(){
        itemContainer.innerText="";
        expenses.forEach(expense=>{
            let div = document.createElement('div');
            div.innerHTML=`
            <p>${expense.name} - $${expense.amount}</p>
            <button data-id=${expense.id}>delete</button>
            `
            div.querySelector('button').addEventListener('click',()=>{
                const index = expenses.findIndex(e=>e.id===expense.id);
                expenses.splice(index,1);
                saveExpenses();
                totalAmount();
                renderExpenses();
            })
            totalAmount();
            itemContainer.appendChild(div);
        })
    }
    function totalAmount(){
        let total = parseFloat(expenses.reduce((sum,expense)=>sum+expense.amount,0));
        totalExpenses.textContent=`${total.toFixed(2)}`;
    }
    function saveExpenses(){
        localStorage.setItem("expenses",JSON.stringify(expenses));
    }
})