"use srict";
let start = document.getElementById('start'),
    currentDate = document.getElementsByClassName('time-data')[0],
    currentYear = document.getElementsByClassName('year-value')[0],
    currentMonth = document.getElementsByClassName('month-value')[0],
    currentDay = document.getElementsByClassName('day-value')[0],   
    //
    income = document.getElementsByClassName('budget-value')[0],
    dayBudget = document.getElementsByClassName('daybudget-value')[0],
    levelIncome = document.getElementsByClassName('level-value')[0],
    importantExpens = document.getElementsByClassName('expenses-value')[0],
    optionalExpens = document.getElementsByClassName('optionalexpenses-value'),
    additionalIncome = document.getElementsByClassName('income-value'),
    accumulateInMonth = document.getElementsByClassName('monthsavings-value'),
    accumulateInYear = document.getElementsByClassName('yearsavings-value'),
    //
    approve =  document.getElementsByClassName('expenses-item-btn'),
    //
    collectionExpenses = document.getElementsByClassName('expenses-item'),
    // no important
    optionExpens = document.getElementById('optionalexpenses_1'),
    optionExpensTwo = document.getElementById('optionalexpenses_2'),
    optionExpensThree = document.getElementById('optionalexpenses_3'),
    approveNoImpExpenses = document.getElementsByClassName('optionalexpenses-btn'),
    //btn of day budget
    calculateDayBud = document.querySelector('.count-budget-btn'),
    possibleIncome = document.querySelector('.choose-income'),
    //
    checkboxAccumulation = document.getElementById('savings'),
    accumulationSum = document.getElementById('sum'),
    accumulationPercent = document.getElementById('percent');
    let money, time;

    start.addEventListener('click', function(event) {
        time = new Date(prompt('Введите текущую дату YYYY-MM-DD', ''));
        money = +prompt('Введите бюджет в месяц', '');

        while(money == null || money == '' || isNaN(money)) {
            money = prompt('Введите бюджет в месяц', '')
        }

        appData.budget = money;
        appData.timeData = time;
        income.textContent += money.toFixed();
        currentYear.value = new Date(Date.parse(time)).getFullYear();
        currentMonth.value = new Date(Date.parse(time)).getMonth() + 1;
        currentDay.value = new Date(Date.parse(time)).getDate();
        // метод value работатет у input, т.к. вставляет значения в поле предусмотренное для чтения
        // у экземпляра объекта date есть методы работы
        // parse парсит значение из промпт затем след метод получает текущую дату
    });

    approve.addEventListener('click', function(event) {
        let sum = 0;

        for( let i = 0; i < collectionExpenses.length; i++) {
            if(collectionExpenses[i] % 2 != 0) {
                collectionExpenses[i] += sum;
            }
            // if(typeof firstQuestion != null && typeof secondQuestion != null && firstQuestion != '' && secondQuestion != '' && firstQuestion.length < 50) {
            //     console.log("it's done");
            //     appData.expenses[a] = b;
            // } else {
            //     i = i - 1;
            // }
        }

        // sum += importantExpens;
    });

let appData = {
    budget: money,
    expenses: {},
    optionalExpenses: {},
    income: [],
    timeData: time,
    savings: true,
    // chooseExpences: function() {


    // },
    detectDayBudget: function() {
        appData.moneyPerDay = (appData.budget / 30).toFixed();
        console.log('Ежедневный бюджет ' + appData.moneyPerDay);
    },
    detectLevel: function() {
        if(appData.moneyPerDay < 100) {
            console.log('Минимальный уровень достатка');
        } else if(appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            console.log('Средний уровень достатка');
        } else if(appData.moneyPerDay > 2000) {
            console.log('Высокий уровень достатка');
        } else {
            console.log('Error in your value');
        }
    },
    checkSavings: function() {
        if(appData.savings == true) {
            let save = +prompt('Какова сумма накоплений?', ''),
                percent = +prompt('Под какой процент', '');

            appData.monthIncome = save / 100 / 12 * percent;
            console.log('Доход в месяц с вашего депозита: ' + appData.monthIncome);
        }
    },
    chooseOptExpenses: function() {
        for(let i = 0; i < 3;i++) {
            let opt = prompt('Статья необязательный расходов', '');
            appData.optionalExpenses[i] = opt;
        }
    },
    chooseIncome: function() {
        for(let i = 0;;i++) {
            let items = prompt('Что принесет доп доход?', 'Перечислите через запятую', '');
            if(items != '' && (  (items)) != null){
                appData.income = items;
                break;
            }
        }
        let resultOfprompt = appData.income.split(',');
        resultOfprompt.forEach( (i, item, resultOfprompt) => {
            console.log('Способы доп заработка: ' + resultOfprompt[item + 1]);
        });
    },
};
