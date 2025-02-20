<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\UserRequest;

class UserController extends Controller
{
    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index() : JsonResponse
    {
        $users = User::orderBy('id', 'DESC')->paginate(2);
        return response()->json([
            'status' => true,
            'users' => $users,
        ]);
    }

    public function show($id) : JsonResponse
    {
        $user = User::find($id);
        return response()->json([
            'status' => true,
            'user' => $user,
        ]);
    }

    /**
     * @param UserRequest $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function store(UserRequest $request) : JsonResponse
    {
        DB::beginTransaction();
        try {
            $user = User::Create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
            ]);

            DB::commit();
            return response()->json([
                'status' => true,
                'user' => $user,
                'message' => 'Usuário cadastrado com sucesso',
            ],201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => 'Erro ao cadastrar usuário',
                'error' => $e->getMessage(),
            ], 422);
        }
    }

    public function update(UserRequest $request, $id) : JsonResponse
    {
        DB::beginTransaction();
        try {
            $user = User::find($id);
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
            ]);

            DB::commit();
            return response()->json([
                'status' => true,
                'user' => $user,
                'message' => 'Usuário atualizado com sucesso',
            ],201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => 'Erro ao atualizar usuário',
                'error' => $e->getMessage(),
            ], 422);
        }
    }

    public function destroy($id) : JsonResponse
    {
        DB::beginTransaction();
        try {
            $user = User::find($id);
            $user->delete();

            DB::commit();
            return response()->json([
                'status' => true,
                'message' => 'Usuário deletado com sucesso',
            ],201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => 'Erro ao deletar usuário',
                'error' => $e->getMessage(),
            ], 422);
        }
    }
}
