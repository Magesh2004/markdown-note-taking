const express = require('express')
const app = express()

const path = require('path')
const {marked} = require('marked')

const multer = require('multer')
const upload = multer({storage:multer.memoryStorage()});

const {PrismaClient} = require('./generated/prisma')
const axios = require('axios')

const prisma = new PrismaClient()

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded({extended:true}))

app.listen(8000,()=>{
    console.log("Server is running on port 8000")
})

app.get('/',async(req,res)=>{
    const notes = await prisma.note.findMany({
        select:{
            id:true,
            title:true
        },orderBy: {
             createdAt: 'desc' 
        }
    })
    res.render('notes',{notes})
})

app.post('/upload',upload.single('markdown'),async(req,res)=>{
    const file = req.file
    const title = req.body.title || file.originalname

    const newNote = await prisma.note.create({
        data:{
            title,
            file:file.buffer
        }
    })
    res.redirect(`/notes/${newNote.id}`)

})

app.get('/notes/:id',async(req,res)=>{
    const id = parseInt(req.params.id)
    const notes =await prisma.note.findUnique({
        where:{
            id
        }
    })
    if(!notes)return res.send("Note not found")
    const markdown = Buffer.from(notes.file).toString('utf-8')
    const html = marked.parse(markdown)
    res.render('view-note',{title:notes.title,html})
})
app.get('/grammar/:id',async(req,res)=>{
    const id = parseInt(req.params.id)
    const notes =await prisma.note.findUnique({
        where:{
            id
        }
    })
    if(!notes)return res.send("Note not found")
    const markdown = Buffer.from(notes.file).toString('utf-8')
    try{
        const response = await axios.get('https://api.textgears.com/grammar', {
        params: {
            text: markdown,
            language: 'en-GB',
            key: process.env.API_KEY
        }
        });
        const grammarIssues = response.data.response.errors;

        const issues = grammarIssues.map(err => ({
        bad: err.bad,
        better: err.better.join(', '),
        description: err.description
        }));
        res.render('grammar-view', {
            title: notes.title,
            issues,
        });

    }catch(e){
        
    }
});