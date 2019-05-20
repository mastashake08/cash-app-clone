<?php

namespace App\Http\Controllers\Auth;
use App\Http\Controllers\Controller;
use Socialite;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
class LoginController extends Controller
{
    /**
     * Redirect the user to the GitHub authentication page.
     *
     * @return \Illuminate\Http\Response
     */
    public function redirectToProvider()
    {
        return Socialite::driver('stripe')->redirect();
    }

    /**
     * Obtain the user information from GitHub.
     *
     * @return \Illuminate\Http\Response
     */
    public function handleProviderCallback()
    {
        $stripeUser = Socialite::driver('stripe')->user();
        $accessTokenResponseBody = $stripeUser->accessTokenResponseBody;
        //check if user is already in system
        $user = User::where('stripe_id',$stripeUser->getId())->first();
        if($user === null){
           $user = User::Create([
                'token' => $stripeUser->token,
                'stripe_id' => $stripeUser->getId(),
                'email' => $stripeUser->getEmail(),
                'name' => $stripeUser->getNickname(),
                'tag' => Str::slug($stripeUser->getNickname(), '-')
            ]);
        }
        Auth::login($user);
        return redirect('/home');
    }
}
