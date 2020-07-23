"use srict";
let start = document.getElementById('start'),
    currentDate = document.getElementsByClassName('time-data')[0],
    currentYear = document.getElementsByClassName('year-value')[0],
    currentMonth = document.getElementsByClassName('month-value')[0],
    currentDay = document.getElementsByClassName('day-value')[0],
    //
    income = document.getElementsByClassName('budget-value')[0],
    dayBudget = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    importantExpens = document.getElementsByClassName('expenses-value')[0],
    optionalExpens = document.getElementsByClassName('optionalexpenses-value')[0],
    additionalIncome = document.querySelector('.income-value'),
    accumulateInMonth = document.querySelector('.monthsavings-value'),
    accumulateInYear = document.querySelector('.yearsavings-value'),
    //
    approve =  document.getElementById('expenses-item-btn'),
    //
    collectionExpenses = document.getElementsByClassName('expenses-item'),
    // no important
    optionalColectionExp = document.getElementsByClassName('optionalexpenses-item'),
    approveNoImpExpenses = document.getElementById('optionalexpenses-btn'),
    //btn of day budget
    calculateDayBudget = document.querySelector('.count-budget-btn'),
    possibleIncome = document.querySelector('.choose-income'),
    //
    checkboxAccumulation = document.getElementById('savings'),
    accumulationSum = document.getElementById('sum'),
    accumulationPercent = document.getElementById('percent');
    let money, time;

window.onload = function() {
    alert('Please click on ' + '"' + start.textContent + '"');
};

start.addEventListener('click', function(event) {
    time = new Date(prompt('Введите текущую дату YYYY-MM-DD', ''));
    money = +prompt('Введите бюджет в месяц', '');

    while(money == null || money == '' || isNaN(money)) {
        money = prompt('Введите бюджет снова', '')
    }

    appData.budget = money;
    appData.timeData = time;
    income.textContent += money.toFixed();

    // -----------------------------------
    currentYear.value = new Date(Date.parse(time)).getFullYear();
    currentMonth.value = new Date(Date.parse(time)).getMonth() + 1;
    currentDay.value = new Date(Date.parse(time)).getDate();

    // make the button active
    approve.removeAttribute('disabled');
    approveNoImpExpenses.removeAttribute('disabled');
    calculateDayBudget.removeAttribute('disabled');
    checkboxAccumulation.removeAttribute('disabled');
});

approve.addEventListener('click', function(event) {
    let sum = 0;

    for( let i = 0; i < collectionExpenses.length; i++) {
        let firstQuestion = collectionExpenses[i].value,
            secondQuestion = collectionExpenses[++i].value;

        if(typeof firstQuestion != null && typeof secondQuestion != null && firstQuestion != '' && secondQuestion != '' && firstQuestion.length < 50) {
            appData.expenses[firstQuestion] = secondQuestion;
            sum += +secondQuestion;
        } else {
            i = i - 1;
        }
    }

    return importantExpens.textContent = sum;
});

approveNoImpExpenses.addEventListener('click', function(event) {
    let sum = 0;

    for( let i = 0; i < optionalColectionExp.length; i++ ) {
        let getOptionVal = optionalColectionExp[i].value;

        if(typeof getOptionVal != null && getOptionVal != '') {
            appData.optionalExpenses.push(getOptionVal);
            sum += +getOptionVal;
        }
    }
    optionalExpens.textContent = sum;
});

calculateDayBudget.addEventListener('click', function() {
    if(appData.budget != undefined) {
        let dayBudg = (appData.budget / 30).toFixed();
        appData.ourDayBudget = +dayBudg;
        dayBudget.textContent = dayBudg;

        if(appData.ourDayBudget < 100) {
            appData.detectLevel = 'Минимальный уровень достатка';
            levelValue.textContent = appData.detectLevel;
        } else if(appData.ourDayBudget > 100 && appData.ourDayBudget < 2000) {
            appData.detectLevel = 'Средний уровень достатка';
            levelValue.textContent = appData.detectLevel;
        } else if(appData.ourDayBudget > 2000) {
            appData.detectLevel = 'Высокий уровень достатка';
            levelValue.textContent = appData.detectLevel;
        }
    } else levelValue.textContent = 'Произошла ошибка';
});

possibleIncome.addEventListener('input', function() {
// possibleIncome.addEventListener('change', function() {
    let inputValue = possibleIncome.value;
    appData.income = inputValue.split(', ');
    additionalIncome.textContent = appData.income;
});

savings.addEventListener('click', function() {
    if(appData.savings === true) {
        appData.savings = false;
    } else appData.savings = true;
});

accumulationSum.addEventListener('input', function() {
    if(appData.savings === true) {
        let currentSum = +accumulationSum.value,
            currentPercent = +accumulationPercent.value;

        appData.monthIncome = currentSum / 100 / 12 * currentPercent;
        appData.yearIncome = currentSum / 100 * currentPercent;

        accumulateInMonth.textContent = appData.monthIncome.toFixed(1);
        accumulateInYear.textContent = appData.yearIncome.toFixed(1);
    }
});

accumulationPercent.addEventListener('input', function() {
    if(appData.savings === true) {
        let currentPercent = +accumulationPercent.value,
            currentSum = +accumulationSum.value;

        appData.monthIncome = currentSum / 100 / 12 * currentPercent;
        appData.yearIncome = currentSum / 100 * currentPercent;

        accumulateInMonth.textContent = appData.monthIncome.toFixed(1);
        accumulateInYear.textContent = appData.yearIncome.toFixed(1);

    }
});



let appData = {
    budget: money,
    expenses: {},
    optionalExpenses: [],
    income: [],
    timeData: time,
    savings: false,
    ourDayBudget: 0,
    detectLevel: '',
    monthIncome: 0,
    yearIncome: 0
};
