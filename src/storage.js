export const local_storage = window.localStorage;


export const demo_data = [
  [
    "ags2ag", [
    {"text": "Это - список дел", "completed": false, "id": 3},
    {"text": "Можно добавить новый", "completed": false, "id": 5},
    {"text": "список дел", "completed": true, "id": 8},
    ],
    "Привет"
  ],
  [
    "uIdajsfn2", [
    {"text": "Можно редактировать имеющийся", "completed": false, "id": 3},
    {"text": "или просто удалить", "completed": true, "id": 5},
    {"text": "и создать новый список", "completed": false, "id": 8},
    ],
    "Назвать"
  ],
]



export const session_storage = window.sessionStorage; //2delete Use that for ctrl+z and ctrl+y page actions

//I did separate file to keep global namespace clean