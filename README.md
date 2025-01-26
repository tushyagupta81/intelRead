# PDF smart analysis

A smart PDF analysis tool powered by AI to read a pdf and give answer to questions with context to the given PDf.

It is powered by langchain and uses HuggingFace embedders and Google Gemini LLM model for better and clearer responses.

The PDF is embedded into vector which is then stored in a vector database that helps provide context to the answeres given by the LLM model.

Currently the frontend and backend are not connected but work fine independently.

## Tech Stack Used
- NextJs
- TailwindCSS
- Prisma
- trpc
- Django
- langchain
- HuggingFace
- Pinecone
- Google Gemini

## Languages Used
- Python
- TypeScript

## Requirements
- python 3.12.8
- node v23.3.0
- API's
    - HuggingFace API(free)
    - Pinecone database API(free)
    - Google API key(free)
    > These go into the the pdf_read.py in ai folder or the python notebooks in the root dir(for ai only)

## Installation
```bash
git clone https://github.com/tushyagupta81/intelRead.git ./intelRead
cd interRead
```

### For Frontend

```bash
cd intelRead
npm i
npm run dev
```

### For Backend

```bash
cd backend
python manage.py runserver
```

> Note: you need to install the python packes in the requirements.txt in the root dir\
> ```bash
> pip install -r requirements.txt
> ```
