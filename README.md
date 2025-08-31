# React performance
---
## Check before optimization

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

- Search by Name (type "ru")
<img width="623" height="254" alt="image" src="https://github.com/user-attachments/assets/13ddbc70-4ba2-481d-adfc-1fed405c7e72" />

- Search by year
<img width="954" height="277" alt="image" src="https://github.com/user-attachments/assets/29854566-b416-4df6-b0db-561f67daec2a" />

---
## Check after optimization

### Render table 
<img width="596" height="376" alt="image" src="https://github.com/user-attachments/assets/6787f2ab-68dc-445b-9320-753c3d6bf317" />


### Add column with data 
-table: 
<img width="585" height="280" alt="image" src="https://github.com/user-attachments/assets/b579cd0d-2559-4df3-9542-90e1c5c6ad36" />

-controls:
<img width="598" height="318" alt="image" src="https://github.com/user-attachments/assets/14707a90-62f8-449a-91cb-11f74100c548" />

### Sorting

- Sort by Name
-- descending : commited 2.2s , rendered 41.9ms
-- ascending : commited 3s , rendered 17.8ms
- Sort by Population
-- descending : commited 2.5s , rendered 18ms
-- ascending : commited 1.5s , rendered 40.4ms

### Searching 

- Search by Name (type "ru")
<img width="1152" height="431" alt="image" src="https://github.com/user-attachments/assets/2055ba38-20f5-4d30-9ca5-bb73ee9d6d6f" />


- Search by year
<img width="1414" height="355" alt="image" src="https://github.com/user-attachments/assets/3bd806b5-cc29-4b9f-a05b-702d5b6aac9e" />





