// const KEYS = {
//     days: 'days',
//     dayId: 'dayId'
// }

export const getDaysCollection = () => [
					{ id: "Monday", title: "Monday" },
					{ id: "Tuesday", title: "Tuesday" },
					{ id: "Wednesday", title: "Wednesday" },
					{ id: "Thursday", title: "Thursday" },
					{ id: "Friday", title: "Friday" },
				];

export function insertDay(data) {
    // let days = getAllDays();
    // data['id'] = generateDayId()
    // days.push(data)
    // localStorage.setItem(KEYS.days, JSON.stringify(days))
}

export function updateDay(data) {
    // let days = getAllDays();
    // let recordIndex = days.findIndex(x => x.id == data.id);
    // days[recordIndex] = { ...data }
    // localStorage.setItem(KEYS.days, JSON.stringify(days));
}

export function deleteDay(id) {
    // let days = getAllDays();
    // days = days.filter(x => x.id != id)
    // localStorage.setItem(KEYS.days, JSON.stringify(days));
}

export function generateDayId() {
    // if (localStorage.getItem(KEYS.dayId) == null)
    //     localStorage.setItem(KEYS.dayId, '0')
    // var id = parseInt(localStorage.getItem(KEYS.dayId))
    // localStorage.setItem(KEYS.dayId, (++id).toString())
    // return id;
}

export function getAllDays() {
    // if (localStorage.getItem(KEYS.days) == null)
    //     localStorage.setItem(KEYS.days, JSON.stringify([]))
    // let days = JSON.parse(localStorage.getItem(KEYS.days));
    // //map departmentID to department title
    // let departments = getDepartmentCollection();
    // return days.map(x => ({
    //     ...x,
    //     department: departments[x.departmentId - 1].title
    // }))
}