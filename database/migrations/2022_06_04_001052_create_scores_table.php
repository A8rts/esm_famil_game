<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('scores', function (Blueprint $table) {
            $table->id();
            $table->string('room_key');
            $table->string('letter');
            $table->integer('from_id');
            $table->string('name');
            $table->string('esm_score');
            $table->string('famil_score');
            $table->string('ghaza_score');
            $table->string('miveh_score');
            $table->string('mashin_score');
            $table->string('ashia_score');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('scores');
    }
};
