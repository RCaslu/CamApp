<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CollectionImageController extends Controller
{
    public function store(Request $request, $collection_id, $image_id)
    {
        // Verifica se a coleção e a imagem existem
        $collection = DB::table('collections')->find($collection_id);
        $image = DB::table('images')->find($image_id);

        if (!$collection || !$image) {
            return response()->json(['message' => 'Collection or Image not found'], 404);
        }

        // Criando o relacionamento entre coleção e imagem
        DB::table('collection_images')->insert([
            'collection_id' => $collection_id,
            'image_id' => $image_id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'Image added to collection'], 201);
    }

    public function destroy($collection_id, $image_id)
    {
        // Deletando o relacionamento entre coleção e imagem
        $collectionImage = DB::table('collection_images')
                             ->where('collection_id', $collection_id)
                             ->where('image_id', $image_id)
                             ->first();

        if (!$collectionImage) {
            return response()->json(['message' => 'Relationship not found'], 404);
        }

        DB::table('collection_images')
          ->where('collection_id', $collection_id)
          ->where('image_id', $image_id)
          ->delete();

        return response()->json(null, 204);
    }
}
