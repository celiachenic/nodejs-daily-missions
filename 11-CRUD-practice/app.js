const express = require('express');
const cors = require('cors')
const app =express();
const memberRouter = require('./routes/member')

app.use(cors());
app.use(express.json());

app.use("/members",memberRouter)

app.use((req, res) => {
  res.status(404).send("找不到頁面");
});

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`server is running on PORT ${PORT}`)
})