<h1>Admin User Interface</h1>
<img src="https://drive.google.com/file/d/13gsRh54CuSV9Bmowbg5p08eqKyDsvrzq/view" alt="ui"/>
This is a user interface for admins to view and delete users in a startup. The interface retrieves user data from an API and provides various features to manage the user records.
<hr/>
<h2>Features</h2>
<p><h7>Column Titles:</h7> The column titles are prominently displayed to distinguish them from the user entries.</p>
Search Bar: A search bar is available to filter users based on any property.
Edit and Delete: Users can be edited or deleted directly within the interface. Note that these changes are only in memory and not persisted.
Pagination: Users are displayed in pages, with each page containing 10 rows. Pagination buttons allow easy navigation between pages, including options to jump to the first, previous, next, and last page. Pagination updates dynamically based on search and filtering results.
Row Selection: Users can select one or more rows by clicking the checkboxes. Selected rows are highlighted with a grayish background color. Multiple selected rows can be deleted simultaneously using the "Delete Selected" button at the bottom left.
Select/Deselect All: The checkbox at the top left corner provides a shortcut to select or deselect all rows displayed on the current page. It applies only to the 10 rows visible in the current page, not to all the rows.
<hr/>
<h2>Tech Stack<h2>
<p>The implementation of this user interface involves the following technologies:</p>
<div>
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
  <li>Fetch (for API communication)</li>
  <li>React</li>
</ul>
</div>
<hr/>
<h2>Users API</h2>
<p>To retrieve the list of users and their properties, an API is provided. Here are the details:</p>

<p>Request Type: GET</p>

<h6>Endpoint: https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json</h6>

<h4>Sample Response:</h4>
<p>
[
  {
    "id": "1",
    "name": "Aaron Miles",
    "email": "aaron@mailinator.com",
    "role": "member"
  },
  {
    "id": "2",
    "name": "Aishwarya Naik",
    "email": "aishwarya@mailinator.com",
    "role": "member"
  },
  {
    "id": "3",
    "name": "Arvind Kumar",
    "email": "arvind@mailinator.com",
    "role": "admin"
  }
]
</p>
