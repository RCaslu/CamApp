<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function index()
    {
        return Image::all();
    }

    public function show($id)
    {
        return Image::findOrFail($id);
    }

    public function store(Request $request)
    {
        $request->validate([
            'url' => 'required|url',
        ]);

        $image = Image::create($request->all());

        return response()->json($image, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'url' => 'required|url',
        ]);

        $image = Image::findOrFail($id);
        $image->update($request->all());

        return response()->json($image, 200);
    }

    public function destroy($id)
    {
        Image::destroy($id);

        return response()->json(null, 204);
    }

    public function search(Request $request)
    {
        $query = $request->input('q');
        $images = Image::where('url', 'LIKE', "%{$query}%")->get();

        return response()->json($images, 200);
    }

    public function upload(Request $request)
{
    $request->validate([
        'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    // Salvar a imagem na pasta storage/app/public/uploads
    $path = $request->file('image')->store('uploads', 'public');

    // Criar um registro no banco de dados
    $image = Image::create([
        'url' => asset("storage/{$path}"), // Gera a URL pública
    ]);

    return response()->json($image, 201);
}

}