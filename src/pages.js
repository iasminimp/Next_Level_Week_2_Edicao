const Database = require('./database/db')

const {subjects,weekdays,getSubject, convertHoursToMinutes} = require('./utils/format')


//funcionalidades
function pageLanding(req, res){
    return res.render("index.html")
}
async function pageStudy(req, res){
    //console.log(req.query) //prova real, do nunjucks --> filtrando resultados
    const filters = req.query
    
    //se qualquer um dos FILTERS estiver VAZIO
    if(!filters.subject || !filters.weekday || !filters.time){
        //console.log('TEM campos vazios jureg')
        return res.render("study.html", {filters,subjects, weekdays})

    }

    //console.log('Não tem campos vazios jureg')

    //converter horas em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time)
    

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE  EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '${filters.subject}'
    `
    //caso haja erro na hora da consulta do banco de dados
    try {
        const db = await Database
        const proffys = await db.all(query)
        proffys.map((proffy)=>{
            proffy.subject = getSubject(proffy.subject)
        })

        return res.render("study.html",{proffys,subjects, filters, weekdays})

    } catch (error){
        console.log(error)
    }

    //return res.render("study.html",{proffys, filters, subjects,weekdays}) //****************attencion  ********************
}

function pageGiveClasses(req, res){
    //console.log('vazio') //printf--> se ta vazio
    //se não mostrar a página
    return res.render("give-classes.html",{subjects,weekdays})
}

async function saveClasses(req, res){
    const createProffy = require('./database/createProffy')
    //const data = req.body
    const proffyValue ={
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }  
    
    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }
    const classScheduleValues = req.body.weekday.map((weekday, index)=>{
        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }

    })

    try{
        const db = await Database
        await createProffy(db,{proffyValue, classValue, classScheduleValues})

        let queryString = "?subject="+req.body.subject
        queryString += "&weekday="+req.body.weekday[0]
        queryString += "&time="+req.body.time_from[0]

        return res.redirect("/study" + queryString)
    } catch(error){
        console.log("Deu erro aqui jureg")
    }
    //return res.redirect("/study")
} 

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}


