const Database = require('./db')
//const Database = require('sqlite-async')
const createProffy = require('./createProffy')

Database.then(async(db) =>{
    //inserir dados
    proffyValue = {    
        name:"Iasmin Marques Pereira",
        avatar: "https://avatars3.githubusercontent.com/u/50635721?s=460&u=59c95b5e073341030841542bda2532e873b7d0da&v=4",
        whatsapp:"5527999090753",
        bio: "Mano as vezes sim, as vezes não.... mas quase sempre yes or no.",
    
    }
    classValue = {
        subject:1,
        cost:"30"
        //o proffy id vira pelo banco de dados
    }
    classScheduleValues = [
        //class_id vira pelo banco de dados, apos
    {
        weekday:1,
        time_from: 720,
        time_to:1220
    },
    {
        weekday:0,
        time_from: 520,
        time_to:1220 
    }
    ]

    //criando novos proffys
    //await createProffy(db, {proffyValue, classValue, classScheduleValues})

    //consultar os dados inseridos - TODOS
    const selectedProffys = await db.all("SELECT * FROM proffys")
    console.log(selectedProffys)

    //Consulta as classes de um determinao professos
    // e trazer junto os dados do professor
    const selectClassesAndProffys = await db.all (`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;   
    `)
    console.log(selectClassesAndProffys)

    //o horário que a pessos trabalha, por exemplo, é das 8h-18h
    // o horário do time_from(8h) precisa ser menor ou migual ao horário solicitado
    //o time_to precisa ser acima

    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "1300"
        AND class_schedule.time_to > "1300"
    
    `)
    console.log(selectClassesSchedules)
})