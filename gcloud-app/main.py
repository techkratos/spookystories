from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def route():
    return {"message" : "welcome to model api"}
