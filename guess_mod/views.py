from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
#from .models import GamerForm
from guess_mod.models import Gamer, Game, Moves
from guess_mod.forms import UserForm, GamerProfileForm


def game(request):
    return render(request, 'guess_mod/game.html')

def about(request):
    #context_dict = {'gamer': gamer_list}
    # context_dict = {'boldmessage': "I like being bold."}
    return render(request, 'guess_mod/about.html')

@login_required
def restricted(request):
    return HttpResponse("Since your logged in, you can see this")


@login_required
def user_logout(request):
    logout(request)

    return HttpResponseRedirect('/guess_mod/')


def user_login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(username=username, password=password)

        if user:
            if user.is_active:
                login(request, user)
                return HttpResponseRedirect('/guess_mod/game/')
            else:
                return HttpResponse("Your guess_mod account is disabled")
        else:
            print "Invalid login details: {0}, {1}".format(username, password)
            return HttpResponse('Invalid login details supplied')

    else:
        return render(request, 'guess_mod/login.html', {})



def register(request):
    registered = False

    if request.method == 'POST':
        user_form = UserForm(data=request.POST)
        gamer_prof_form = GamerProfileForm(data=request.POST)

        if user_form.is_valid() and gamer_prof_form.is_valid():
            user = user_form.save()

            user.set_password(user.password)
            user.save()

            profile = gamer_prof_form.save(commit=False)
            profile.user = user

            if 'picture' in request.FILES:
                profile.picture = request.FILES['picture']

            profile.save()

            registered = True

        else:
            print user_form.errors, gamer_prof_form.errors

    else:
        user_form = UserForm()
        gamer_prof_form = GamerProfileForm()

    return render(request, 'guess_mod/register.html', {'user_form': user_form, 'gamer_prof_form': gamer_prof_form, 'registered': registered})


def index(request):
    gamer_list = Gamer.objects.order_by('-username')[:5]
    context_dict = {'gamer': gamer_list}
    # context_dict = {'boldmessage': "I like being bold."}
    return render(request, 'guess_mod/index.html', context_dict)

@csrf_exempt
def add_new_game(request):
    if request.method == "POST":
        current_user = request.user
        n_game = Game(player=current_user)
        n_game.save()
    return HttpResponse('{"status":"success","id":'+ str(n_game.id) + '}', content_type="application/json")

@csrf_exempt
def add_moves_current_game(request):
    if request.method == "POST":
        mv_Start = request.mvStart
        mv_End = request.mvEnd
        mv_Outcome = request.mvOutCome
        mv_Game = request.mvGame
        n_move = Moves(move_start=mv_Start, move_end=mv_End, move_outcome=mv_Outcome, game=mv_Game)
        n_move.save()
    return HttpResponse('{"status":"success","id":n_move.id}', content_type="application/json")