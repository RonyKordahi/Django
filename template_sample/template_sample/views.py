from django.shortcuts import render

def not_found(req, exception):
    return render(req, "error_view.html", status=404)