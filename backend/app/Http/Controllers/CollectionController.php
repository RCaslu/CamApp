<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CollectionController extends Controller
{
    public function index()
    {
        $collections = DB::table('collections')->get();
        return response()->json($collections);
    }

    public function show($id)
    {
            
        $collection = DB::table('collections')->find($id);

        if (!$collection) {
            return response()->json(['message' => 'Collection not found'], 404);
        }

        return response()->json($collection);
    }

    public function store(Request $request)
    {
        
        $request->validate([
            'name' => 'required',
            'user_id' => 'required|exists:users,id',
        ]);

        
        $collectionId = DB::table('collections')->insertGetId([
            'name' => $request->name,
            'user_id' => $request->user_id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $collection = DB::table('collections')->find($collectionId);
        return response()->json($collection, 201);
    }

    public function update(Request $request, $id)
    {
        
        $collection = DB::table('collections')->where('id', $id)->first();

        if (!$collection) {
            return response()->json(['message' => 'Collection not found'], 404);
        }

        DB::table('collections')->where('id', $id)->update([
            'name' => $request->name,
            'user_id' => $request->user_id,
            'updated_at' => now(),
        ]);

        $updatedCollection = DB::table('collections')->find($id);
        return response()->json($updatedCollection);
    }

    public function destroy($id)
    {
        
        $collection = DB::table('collections')->where('id', $id)->first();

        if (!$collection) {
            return response()->json(['message' => 'Collection not found'], 404);
        }

        DB::table('collections')->where('id', $id)->delete();
        return response()->json(null, 204);
    }
}

