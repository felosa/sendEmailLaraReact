<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Mail;

use Illuminate\Http\Request;

class MailController extends Controller
{
    public function send(Request $request){
        
        Mail::raw($request->text, function($message) use($request){
            $message -> from("internet@ecomputer.es","Fernando");
            // foreach ()
            $message -> to($request->to);
            $message -> subject($request->subject);
        });
        
    }
}
