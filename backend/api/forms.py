from django import forms

from .models import Document, PdfSession


class DocumentForm(forms.ModelForm):
    class Meta:
        model = Document
        fields = ["pdf"]


class PdfSessionForm(forms.ModelForm):
    class Meta:
        model = PdfSession
        fields = ["session_id", "file_name"]
