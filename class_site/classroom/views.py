from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import TemplateView, FormView, CreateView, ListView, DetailView, UpdateView, DeleteView

from .forms import ContactForm
from .models import Teacher

# Create your views here.

class HomeView(TemplateView):
    
    # REQUIRED: connects the view to the template
    template_name = "classroom/home.html"

##########################################################################################################

class ThankYouView(TemplateView):
    template_name = "classroom/thanks.html"

##########################################################################################################

# auto handles the designated form
class ContactFormView(FormView):
    
    # REQUIRED: connects the view to the form
    form_class = ContactForm

    # REQUIRED: tells the view what template to connect to
    template_name = "classroom/contact.html"

    # REQUIRED: happens on successful submission
    # ALTERNATIVE: takes a django url
    success_url = reverse_lazy("classroom:thanks")
    
    # ORIGINAL: takes a path URL, not a template file
    # success_url = "/classroom/thanks/"

    # REQUIRED: happens on successful submission
    def form_valid(self, form):
        print(form.cleaned_data)
        return super().form_valid(form)

##########################################################################################################

# auto creates a from based on the model
# auto saves data from form into the model
class TeacherCreateView(CreateView):

    # when linking the model, it automatically looks for a template
    # matching the model name: <model>_form.html (required)
    # and automatically does model.save() on success
    model = Teacher
    
    # specifies which fields to show in the form
    fields = "__all__"
    
    success_url = reverse_lazy("classroom:thanks")

##########################################################################################################

# auto queries all instances of models for easy listing
# auto stores query results in "object_list"
class ListTeacherView(ListView):

    # when linking the model, it automatically looks for a template
    # matching the model name: <model>_list.html (required)
    model = Teacher

    # renames default object_list / <model>_list
    context_object_name = "teacher_list"

    # overwrites default query model.objects.all() - STATIC
    # https://stackoverflow.com/questions/19707237/use-get-queryset-method-or-set-queryset-variable
    queryset = Teacher.objects.order_by("fname")

##########################################################################################################

# auto queries the specific instance of a model for detailed listing
# queries based off the url parameter passed (usually PK / ID)
class DetailTeacherView(DetailView):

    # when linking the model, it automatically looks for a template
    # matching the model name: <model>_detail.html (required)
    model = Teacher

##########################################################################################################

# auto queries the specific instance of a model for updating
# queries based off the url parameter passed (usually PK / ID)
class UpdateTeacherView(UpdateView):

    # when linking the model, it shares the same template as CreateView
    model = Teacher
    
    # specifies which fields can be updated
    fields = "__all__"

    success_url = reverse_lazy("classroom:list_teacher")

##########################################################################################################

# auto queries the specific instance of a model for deletion
# queries based off the url parameter passed (usually PK / ID)
class DeleteTeacherView(DeleteView):

    # when linking the model, it automatically looks for a template
    # matching the model name: <model>_confirm_delete.html (required)
    model = Teacher

    success_url = reverse_lazy("classroom:list_teacher")