const studentsList = [
  {
    name: "Александр",
    middleName: "Сергеевич",
    surname: "Пушкин",
    birthDate: new Date(1992, 7, 4),
    studyStart: 2020,
    faculty: "Информационных технологий",
  },
  {
    name: "Лев",
    middleName: "Николаевич",
    surname: "Толстой",
    birthDate: new Date(1965, 2, 14),
    studyStart: 2018,
    faculty: "Международных отношений",
  },
  {
    name: "Николай",
    middleName: "Васильевич",
    surname: "Гоголь",
    birthDate: new Date(1987, 11, 24),
    studyStart: 2021,
    faculty: "Психологии",
  },
  {
    name: "Федор",
    middleName: "Михайлович",
    surname: "Достоевский",
    birthDate: new Date(1994, 1, 11),
    studyStart: 2015,
    faculty: "Социологии",
  },
  {
    name: "Иван",
    middleName: "Сергеевич",
    surname: "Тургенев",
    birthDate: new Date(1990, 6, 15),
    studyStart: 2012,
    faculty: "Журналистики",
  },
  {
    name: "Антон",
    middleName: "Павлович",
    surname: "Чехов",
    birthDate: new Date(1997, 4, 19),
    studyStart: 2019,
    faculty: "Юридический",
  },
];

const nameInput = document.querySelector('.table__search-name');
const facultyInput = document.querySelector('.table__search-faculty');
const startStudyInput = document.querySelector('.table__search-start');
const endStudyInput = document.querySelector('.table__search-end');

const createStudentsTable = (students) => {
  const table = document.querySelector('.table');
  const tableBody = document.createElement('tbody');
  const tableHead = document.querySelector('.table thead');
  table.append(tableBody);

  tableHead.classList.add('table-primary');
  tableBody.classList.add('table-dark');
  table.classList.add('table-striped');

  // создаём цикл чтобы заполнить таблицу студентами из массива
  for (let i = 0; i < students.length; i++) {
    const studentTableRow = document.createElement('tr');
    const studentNumber = document.createElement('th');
    const studentName = document.createElement('td');
    const studentFaculty = document.createElement('td');
    const studentBirthDate = document.createElement('td');
    const studentStudyStart = document.createElement('td');
    const studentAge = getStudentAge(students[i].birthDate);



    // Добавляем данные для каждого студента
    tableBody.append(studentTableRow);
    studentNumber.innerHTML = i + 1;
    studentTableRow.append(studentNumber);
    // ФИО
    studentName.innerHTML = students[i].name + ' ' + students[i].middleName + ' ' + students[i].surname;
    studentTableRow.append(studentName);
    // факультет
    studentFaculty.innerHTML = students[i].faculty;
    studentTableRow.append(studentFaculty);
    // дата рождения и возраст
    studentBirthDate.innerHTML = addZero(students[i].birthDate.getDate()) + '.' + addZero(students[i].birthDate.getMonth()) + '.' + students[i].birthDate.getFullYear() + ` (${studentAge} лет)`;
    studentTableRow.append(studentBirthDate);
    // годы обучения
    studentStudyStart.innerHTML = students[i].studyStart + '-' + (+students[i].studyStart + 4);
    studentTableRow.append(studentStudyStart);

  }
};

const addNewStudent = () => {
  const addStudentForm = document.querySelector('.student-form');
  const studentName = document.getElementById('validationName');
  const studentSurname = document.getElementById('validationSurname');
  const studentMiddleName = document.getElementById('validationMiddleName');
  const studentFaculty = document.getElementById('validationFaculty');
  const studentBirthDate = document.getElementById('validationBirthDate');
  const studentStudyStart = document.getElementById('validationStartStudy');

  addStudentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const tableBody = document.querySelector('tbody');
    studentsList.push({
      name: studentName.value,
      middleName: studentMiddleName.value,
      surname: studentSurname.value,
      birthDate: new Date(studentBirthDate.value.split('-')),
      studyStart: studentStudyStart.value,
      faculty: studentFaculty.value,
    })
    tableBody.remove();
    createStudentsTable(studentsList)
  })
};


const studentsNameSort = () => {
  const tableBody = document.querySelector('tbody');
  // функция сортировки по имени
  studentsList.sort((a, b) => a.name.split('') > b.name.split('') ? 1 : -1);
  tableBody.remove();
  createStudentsTable(studentsList);
};

const facultySort = () => {
  const tableBody = document.querySelector('tbody');
  // функция сортировки по факультету
  studentsList.sort((a, b) => a.faculty > b.faculty ? 1 : -1);
  tableBody.remove();
  createStudentsTable(studentsList);
};

const studentsAgeSort = () => {
  const tableBody = document.querySelector('tbody');
  // функция сортировки по дате рождения
  studentsList.sort((a, b) => b.birthDate > a.birthDate ? 1 : -1);
  tableBody.remove();
  createStudentsTable(studentsList);
};

const studyStartSort = () => {
  const tableBody = document.querySelector('tbody');
  // функция сортировки по году начала обучения
  studentsList.sort((a, b) => a.studyStart > b.studyStart ? 1 : -1);
  tableBody.remove();
  createStudentsTable(studentsList);
};

// функция которая берёт все значения из инпутов и по ним перересовывает таблицу
const filterForAll = () => {
  const newStudentsArr = Array.from(studentsList);
  const tableBody = document.querySelector('tbody');
  const filteredArr = [];

  newStudentsArr.forEach((elem) => {
    const studentEndStudy = elem.studyStart + 4;
    const studentStartStudy = elem.studyStart;
    const studentFaculty = elem.faculty.toLocaleLowerCase();
    const studentFullName = (elem.name + ' ' + elem.middleName + ' ' + elem.surname).toLocaleLowerCase();
    // проверяем все инпуты на совпадения
    if (studentFullName.indexOf(nameInput.value.toLocaleLowerCase()) >= 0
      && studentFaculty.indexOf(facultyInput.value.toLocaleLowerCase()) >= 0
      && String(studentStartStudy).indexOf(startStudyInput.value) >= 0
      && String(studentEndStudy).indexOf(endStudyInput.value) >= 0) {
      filteredArr.push(elem);
    };
  });

  // перересовываем по отфильтрованному массиву
  tableBody.remove();
  createStudentsTable(filteredArr);
};

const getStudentAge = (birth) => {
  // получаем возраст студента
  return Math.floor((new Date().getTime() - birth) / (24 * 3600 * 365.25 * 1000));
};

const addZero = (num) => {
  // добавляем "0" для даты рождения
  if (num >= 0 && num <= 9) {
    return '0' + num;
  } else {
    return num;
  };
};

(function() {
  // отключаем пробелы в инпутах
  const studentName = document.getElementById('validationName');
  const studentSurname = document.getElementById('validationSurname');
  const studentMiddleName = document.getElementById('validationMiddleName');
  const arrayForListeners = [studentName, studentSurname, studentMiddleName];

  for (const element of arrayForListeners)
    element.addEventListener('input', () => {
      const str = element.value.trim();
      element.value = str;
    });
})();

(function() {
  // функция добавления обработчика сортировки на заголовки и на инпуты
  const nameSort = document.querySelector('.table__head-name');
  const studentsFacultySort = document.querySelector('.table__head-fac');
  const ageSort = document.querySelector('.table__head-age');
  const studentsStartStudySort = document.querySelector('.table__head-year');

  nameSort.addEventListener('click', studentsNameSort);
  studentsFacultySort.addEventListener('click', facultySort);
  ageSort.addEventListener('click', studentsAgeSort);
  studentsStartStudySort.addEventListener('click', studyStartSort);

  nameInput.addEventListener('input', filterForAll);
  facultyInput.addEventListener('input', filterForAll);
  startStudyInput.addEventListener('input', filterForAll);
  endStudyInput.addEventListener('input', filterForAll);
})();

(function() {
  // устанавливаем максимальную дату для инпута date
  const studentBirthDate = document.getElementById('validationBirthDate');
  const date = new Date();
  const maxDate = date.getFullYear() + '-' + addZero(date.getMonth() + 1) + '-' + addZero(date.getDate());
  studentBirthDate.setAttribute('max', maxDate);
})();

createStudentsTable(studentsList);
addNewStudent();
