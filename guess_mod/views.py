from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
#from .models import GamerForm
from guess_mod.models import Gamer, Game, Moves
from guess_mod.forms import UserForm, GamerProfileForm
from datetime import datetime, date


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
        print ("mike: " + str(current_user.id) + " " + str(current_user))
        n_game = Game(player=current_user)
        n_game.save()
        print("game count: " + str(n_game.id))
    return HttpResponse('{"status":"success","id": ' + str(n_game.id) + '}', content_type="application/json")


@csrf_exempt
def add_moves_current_game(request):
    if request.method == "POST":
        n_move = Moves(game_id=str(request.POST['gameID']), move_start=str(request.POST['move_start']), move_end=str(request.POST['move_end']), move_outcome=str(request.POST['move_outcome']))
        n_move.save()
    return HttpResponse('{"status":"success","id":'+ str(n_move.id) + '}', content_type="application/json")

@csrf_exempt
def update_game_final_details(request):
    if request.method == "POST":
        gm_Id = str(request.POST['gm_id'])
        gm_Start_Date = str(request.POST['gm_start_date'])
        gm_Start_Time = str(request.POST['gm_start_time'])
        gm_End = str(request.POST['gm_start_time'])
        gm_TotMoves = str(request.POST['gm_tot_moves'])
        gm_IncorrectMoves = str(request.POST['gm_incorrect_moves'])
        gm_IconSet = str(request.POST['gm_icon_set'])
        gm_GridCount = str(request.POST['gm_grid_count'])
        gm_User = request.user
        gm_UserID = gm_User.id

        #print gm_UserID
        #print type(gm_UserID)
        u_game = Game(id=gm_Id, game_start_date=gm_Start_Date, game_start=gm_Start_Time, game_end=gm_End, total_moves=gm_TotMoves, incorrect_moves=gm_IncorrectMoves, icon_set=gm_IconSet, grid_count=gm_GridCount, player=gm_User)

        #Game.objects.filter(id=gm_Id).update(game_start_date=gm_Start_Date,game_start=gm_Start_Time,game_end=gm_End,total_moves=gm_TotMoves,incorrect_moves=gm_IncorrectMoves,icon_set=gm_IconSet,grid_count=gm_GridCount)
        u_game.save()
    return HttpResponse('{"status":"success"}', content_type="application/json")