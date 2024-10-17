import os
import time
from uuid import uuid4

from langchain import PromptTemplate
from langchain.chains import RetrievalQA
from langchain.document_loaders import DirectoryLoader, PyPDFLoader
from langchain.embeddings import HuggingFaceInferenceAPIEmbeddings
from langchain.text_splitter import (
    RecursiveCharacterTextSplitter,
)  # to convert to chunks
from langchain.vectorstores import Pinecone as PineconeStore
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_pinecone import PineconeEmbeddings, PineconeVectorStore
from pinecone import Pinecone, ServerlessSpec


def load_new_pdf(file_name, session_id):
    loader = DirectoryLoader("media/", glob=file_name, loader_cls=PyPDFLoader)

    extracted_data = loader.load()
    uuids = [str(uuid4()) for _ in range(len(extracted_data))]

    embeddings = HuggingFaceInferenceAPIEmbeddings(
        api_key="",
        model_name="sentence-transformers/all-MiniLM-l6-v2",
    )

    # Initialize a client
    pc = Pinecone(api_key="")

    # Define index name and check/create it
    index_name = "pdf-chatbot"

    existing_indexes = [index_info["name"] for index_info in pc.list_indexes()]

    if index_name not in existing_indexes:
        pc.create_index(
            name=index_name,
            dimension=384,
            metric="cosine",
            spec=ServerlessSpec(cloud="aws", region="us-east-1"),
        )
        while not pc.describe_index(index_name).status["ready"]:
            time.sleep(1)

    index = pc.Index(index_name)

    vector_store = PineconeVectorStore(
        index=index, embedding=embeddings, namespace=session_id
    )

    vector_store.add_documents(documents=extracted_data, ids=uuids)
    return vector_store


def load_old_pdf(session_id):
    embeddings = HuggingFaceInferenceAPIEmbeddings(
        api_key="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",
        model_name="sentence-transformers/all-MiniLM-l6-v2",
    )

    # Initialize a client
    pc = Pinecone(api_key="c7cb8d38-edaf-4d6e-accb-d251dd7aa2b4")

    # Define index name and check/create it
    index_name = "pdf-chatbot"

    existing_indexes = [index_info["name"] for index_info in pc.list_indexes()]

    if index_name not in existing_indexes:
        pc.create_index(
            name=index_name,
            dimension=384,
            metric="cosine",
            spec=ServerlessSpec(cloud="aws", region="us-east-1"),
        )
        while not pc.describe_index(index_name).status["ready"]:
            time.sleep(1)

    index = pc.Index(index_name)

    # Extract page content from text chunks
    # texts = [json.loads(t.json())["page_content"] for t in text_chunks]

    vector_store = PineconeVectorStore(
        index=index, embedding=embeddings, namespace=session_id
    )

    return vector_store


def createAi(vector_store, promt):
    prompt_template = """
    Use the following pieces of information to answer the user's question.
    If you don't know the answer, just say that you don't know, don't try to make up an answer.
    
    Context: {context}
    Question: {question}
    
    Return a helpful answer and quote the reference from the pdf itself.
    Helpful answer:
    """

    PROMPT = PromptTemplate(
        template=prompt_template, input_variables=["context", "question"]
    )
    chain_type_kwargs = {"prompt": PROMPT}

    if "GOOGLE_API_KEY" not in os.environ:
        os.environ["GOOGLE_API_KEY"] = ""

    llm = ChatGoogleGenerativeAI(
        model="gemini-1.5-pro",
        temperature=0,
        max_tokens=None,
        timeout=None,
        max_retries=2,
        # other params...
    )

    qa = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=vector_store.as_retriever(search_kwargs={"k": 2}),
        return_source_documents=True,
        chain_type_kwargs=chain_type_kwargs,
    )

    result = qa({"query": promt})
    return result
