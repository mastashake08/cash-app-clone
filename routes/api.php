<?php

use Illuminate\Http\Request;
use App\Models\User;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/pay/{id}',function(Request $request,$id){    
    try {
        // Use Stripe's library to make requests...
        //get user
    $user = User::findOrFail($id);
    //authenticate with user key
    \Stripe\Stripe::setApiKey($user->token);

    //create charge and take 50 cent fee
    \Stripe\Charge::create([
        "amount" => $request->amount * 100,
        "currency" => "usd",
        "source" => $request->token, // obtained with Stripe.js
        "description" => "{$request->amount} from {$request->user()->email}"
      ]);
      return response()->json([
          'message' => 'Success'
      ]);
      } catch(\Stripe\Error\Card $e) {
        
        return response()->json([
            'message' => $e->getMessage()
        ]);
      } catch (\Stripe\Error\RateLimit $e) {
        // Too many requests made to the API too quickly
        return response()->json([
            'message' => $e->getMessage()
        ]);
      } catch (\Stripe\Error\InvalidRequest $e) {
        // Invalid parameters were supplied to Stripe's API
        return response()->json([
            'message' => $e->getMessage()
        ]);
      } catch (\Stripe\Error\Authentication $e) {
        // Authentication with Stripe's API failed
        // (maybe you changed API keys recently)
        return response()->json([
            'message' => $e->getMessage()
        ]);
      } catch (\Stripe\Error\ApiConnection $e) {
        // Network communication with Stripe failed
        return response()->json([
            'message' => $e->getMessage()
        ]);
      } catch (\Stripe\Error\Base $e) {
        // Display a very generic error to the user, and maybe send
        // yourself an email
        return response()->json([
            'message' => $e->getMessage()
        ]);
      } catch (Exception $e) {
        // Something else happened, completely unrelated to 
        return response()->json([
            'message' => $e->getMessage()
        ]);
      }
});