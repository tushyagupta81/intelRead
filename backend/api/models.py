from django.db import models

# Create your models here.


class Document(models.Model):
    pdf = models.FileField(upload_to="media/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Document uploaded at {self.uploaded_at}"


class PdfSession(models.Model):
    session_id = models.CharField(max_length=128, primary_key=True)
    file_name = models.CharField(max_length=256)

    def __str__(self):
        return f"{self.file_name} {self.session_id}"
