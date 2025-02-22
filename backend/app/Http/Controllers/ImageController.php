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
}