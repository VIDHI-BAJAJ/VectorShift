from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

@app.get('/')
def read_root():
    return {'Vector':'shift'}

@app.post('/pipelines/parse')  
def parse_pipeline(pipeline: dict):
 
    num_nodes = len(pipeline.get('nodes', []))
    num_edges = len(pipeline.get('edges', []))

    is_dag = True  

    return {'num_nodes': num_nodes, 'num_edges': num_edges, 'is_dag': is_dag}
