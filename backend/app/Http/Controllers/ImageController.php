<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ImageController extends Controller
{
    public function index()
    {
        // Retorna todas as imagens
        $images = DB::table('images')->get();
        return response()->json($images);
    }

    public function show($id)
    {
        // Retorna uma imagem específica
        $image = DB::table('images')->find($id);

        if (!$image) {
            return response()->json(['message' => 'Image not found'], 404);
        }

        return response()->json($image);
    }

    public function store(Request $request)
    {
        // Validando os dados
        $request->validate([
            'url' => 'required|url',
            'user_id' => 'required|exists:users,id', // Valida que o usuário existe
        ]);

        // Inserindo uma nova imagem
        $imageId = DB::table('images')->insertGetId([
            'url' => $request->url,
            'user_id' => $request->user_id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $image = DB::table('images')->find($imageId);
        return response()->json($image, 201);
    }

    public function destroy($id)
    {
        // Deletando uma imagem específica
        $image = DB::table('images')->where('id', $id)->first();

        if (!$image) {
            return response()->json(['message' => 'Image not found'], 404);
        }

        DB::table('images')->where('id', $id)->delete();
        return response()->json(null, 204);
    }
}

