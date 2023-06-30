from django.shortcuts import render

# Create your views here.

def example_view(req):
    # return(req, template url)
    return render(req, "my_app/example.html")

def variable_view(req):

    my_var = {
        "first_name": "Rony", 
        "last_name": "Kordahi", 
        "some_list": [1, 2, 3],
        "logged_in": True
    }

    # context passes the data
    return render(req, "my_app/variable.html", context=my_var)