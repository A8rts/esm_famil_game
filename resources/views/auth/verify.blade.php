@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('آدرس ایمیل خود را تأیید کنید') }}</div>

                <div class="card-body">
                    @if (session('resent'))
                        <div class="alert alert-success" role="alert">
                            {{ __('یک پیوند تأیید جدید به آدرس ایمیل شما ارسال شده است.') }}
                        </div>
                    @endif

                    {{ __('قبل از ادامه، لطفاً ایمیل خود را برای پیوند تأیید بررسی کنید.') }}
                    {{ __('اگر ایمیل را دریافت نکردید') }},
                    <form class="d-inline" method="POST" action="{{ route('verification.resend') }}">
                        @csrf
                        <button type="submit" class="btn btn-link p-0 m-0 align-baseline">{{ __('برای درخواست دیگری اینجا را کلیک کنید') }}</button>.
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
