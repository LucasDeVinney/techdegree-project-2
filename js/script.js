/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

// Dynamically adds search bar to the page and filters data based on input value

function searchInput() {

   // Adds search bar
   let html = `<label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
 </label>`;
   let searchInputBox = document.querySelector('.header');
   searchInputBox.insertAdjacentHTML('beforeend', html);

   let searchInput = document.querySelector('input');

   // Creates event listener
   searchInput.addEventListener('keyup', (e) => {
      let filtered = [];
      let userInput = searchInput.value.toLowerCase();

      for (let i = 0; i < data.length; i++) {
         let name = data[i].name.first + " " + data[i].name.last;
         
         if (name.toLowerCase().includes(userInput)) {
            filtered.push(data[i]);
         }
         if (filtered.length > 0) {
            addPagination(filtered);
            showPage(filtered, 1);
         } else {
            document.querySelector('.student-list').innerHTML = `<h3>No Results Were Found...</h3>`
            document.querySelector('.link-list').innerHTML = '';
         }
      }
   });
}

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
   let startIndex = (page * 9) - 9;
   let endIndex = page * 9;

   let studentList = document.querySelector('.student-list')
   studentList.innerHTML = '';

   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         let html = `<li class="student-item cf">
         <div class="student-details">
           <img class="avatar" src="${list[i].picture.thumbnail}" alt="Profile Picture">
           <h3>${list[i].name.first} ${list[i].name.last}</h3>
           <span class="email">${list[i].email}</span>
         </div>
         <div class="joined-details">
           <span class="date">Joined ${list[i].registered.date}</span>
         </div>
       </li>`;
       studentList.insertAdjacentHTML('beforeend', html);
      }
   }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
   let numOfPages = Math.ceil(list.length/9);
   let linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';

   for (let i = 1; i <= numOfPages; i++) {
      let html = `<li>
      <button type="button">${i}</button>
    </li>`;
      linkList.insertAdjacentHTML('beforeend', html);
   }

   document.querySelector('li button').className = 'active'; // 'li button' selector allows the search button to be skipped, this way the right button stays highlighted

   linkList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         document.querySelector('.active').className = '';
         e.target.className = 'active';
         showPage(list, e.target.textContent)
      }
   })
}

// Call functions

showPage(data, 1);
addPagination(data);
searchInput();