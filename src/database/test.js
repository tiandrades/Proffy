const Database = require('./db')
const createProffy = require('./createProffy')

Database.then(async (db) => {
    // Inserir dados
    proffyValue = {
        name: "Victor Menegazzo",
        avatar: "https://avatars0.githubusercontent.com/u/56408507?s=460&u=606162c7ee33eea57e09e4fd18caa6ffe77ae4ba&v=4",
        whatsapp: "8998998899",
        bio: "Um cara super legal e apaixonado pela História<br><br>Apaixonado pela história do Brasil.",
    }

    classValue = {
        subject: 1,
        cost: "200",
        // O proffy id virá pelo banco de dados
    }
    
    classScheduleValue = [
        // class_id virá pelo banco de dados, após cadastrarmos a class
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]

    // await createProffy(db, { proffyValue, classValue, classScheduleValue })

    // Consultar os dados inseridos

    // Todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    // console.log(selectedProffys)

    // Consultar as classes de um determinado professor
    // e trazer junto os dados do professor
    const selectClassesAndProffys = await db.all(`
        SELECT classes. *, proffys. *
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    // console.log(selectClassesAndProffys)

    // O horário que a pessoa trabalha, por exemplo, é das 8h - 18h
    // O horário do time_from (8h) precisa ser antex ou igual ao horário solicitado
    // O time_to precisa ser acima
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = 1
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "1300"
        AND class_schedule.time_to > "1300"

    `)
    console.log(selectClassesSchedules)

})