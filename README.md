# React performance

## Check before optimization
---
### Render table
<img width="294" height="173" alt="render-table" src="https://github.com/user-attachments/assets/b80ad92d-e7ab-4803-9250-2d21f28ca035" />

### Add column with data 
- table:
<img width="293" height="197" alt="image" src="https://github.com/user-attachments/assets/73ecfb87-3c6e-492f-a8c5-548559e93a01" />

- controls:
<img width="298" height="133" alt="image" src="https://github.com/user-attachments/assets/4b2d0a33-8b95-411c-b508-a2be69733ed6" />

### Sorting

- Sort by Name
-- descending : commited 1.8s , rendered 465.5ms
-- ascending : commited 3.6s , rendered 488.5ms
- Sort by Population
-- descending : commited 1.7s , rendered 438ms
-- ascending : commited 3.8s , rendered 426.6ms
  
### Searching 

- Search by Name
<img width="623" height="254" alt="image" src="https://github.com/user-attachments/assets/13ddbc70-4ba2-481d-adfc-1fed405c7e72" />

- Search by year
<img width="954" height="277" alt="image" src="https://github.com/user-attachments/assets/29854566-b416-4df6-b0db-561f67daec2a" />

