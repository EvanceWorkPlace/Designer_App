from rest_framework.response import Response
from rest_framework import status
from functools import wraps

def staff_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        user = request.user
        if not user or not user.is_authenticated or not user.is_staff:
            return Response({'detail':'staff access required'}, status=status.HTTP_403_FORBIDDEN)
        return view_func(request, *args, **kwargs)
    return _wrapped_view
