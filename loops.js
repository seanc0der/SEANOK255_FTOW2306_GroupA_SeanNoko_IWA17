const MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const getDaysInMonth = (date) =>
	new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

// Only edit below

const dayOffset = (day) => {
	const MonToSunIndex = [6, 0, 1, 2, 3, 4, 5];
	return MonToSunIndex[day];
};

const createArray = (length) => {
	const result = [];

	for (let i = 0; i < length; i++) {
		result.push(i);
	}

	return result;
};

const createData = () => {
	const current = new Date();
	current.setDate(1);

	const startDay = dayOffset(current.getDay());

	const daysInMonth = getDaysInMonth(current);

	const weeks = createArray(6);
	const days = createArray(7);
	const result = [];

	for (const weekIndex of weeks) {
		result.push({
			week: weekIndex + 1,
			days: [],
		});

		for (const dayIndex of days) {
			let day =
				weekIndex === 0
					? dayIndex - startDay
					: weekIndex * 7 + dayIndex - startDay;

			const isValid = day > 0 && day <= daysInMonth;

			result[weekIndex].days.push({
				dayOfWeek: dayIndex + 1,
				value: isValid ? day : "",
			});
		}
	}

	const [, , , , , week6] = result;
	const {
		days: [{ value: firstDayValue }],
	} = week6;

	if (!firstDayValue) result.pop();

	return result;
};

const addCell = (existing, classString, value) => {
	const result = `
        ${existing}

        <td class="${classString}">
            &nbsp;${value}&nbsp;
        </td>
    `;

	return result;
};

const createHtml = (data) => {
	let result = "";

	for (const { week, days } of data) {
		let inner = "";
		inner = addCell(inner, "table__cell table__cell_sidebar", `Week ${week}`);

		for (const { dayOfWeek, value } of days) {
			const isToday = new Date().getDate() === value;
			const isWeekend = dayOfWeek === 1 || dayOfWeek === 7;
			const isAlternate = week % 2 === 0;

			let classString = "table__cell";

			if (isToday) classString = `${classString} table__cell_today`;
			if (isWeekend) classString = `${classString} table__cell_weekend`;
			if (isAlternate) classString = `${classString} table__cell_alternate`;
			inner = addCell(inner, classString, value);
		}

		result = `
            ${result}
            <tr>${inner}</tr>
        `;
	}

	return result;
};

// Only edit above

const current = new Date();
document.querySelector("[data-title]").innerText = `${
	MONTHS[current.getMonth()]
} ${current.getFullYear()}`;

const data = createData();
document.querySelector("[data-content]").innerHTML = createHtml(data);
