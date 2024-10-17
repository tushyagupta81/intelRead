from django.core.cache import cache
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .ai import createAi, load_new_pdf, load_old_pdf
from .forms import DocumentForm, PdfSessionForm
from .models import PdfSession

# Create your views here.


@csrf_exempt
def upload_pdf(request):
    if request.method == "POST":
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return HttpResponse(status=200)
    return HttpResponse(status=400)


@csrf_exempt
def get_promt(request):
    if request.method == "POST":
        vector_store = cache.get("pinecone_vector_store")
        resp = createAi(vector_store, request.data["promt"])
        return JsonResponse(f"'result':{resp}")
