import logging
from functools import wraps

logger = logging.getLogger(__name__)

def audit_action(action_name):
    def inner(func):
        @wraps(func)
        def wrapper(request, *args, **kwargs):
            user = getattr(request, 'user', None)
            logger.info(f"{action_name} by {user} - {request.method} {request.path}")
            return func(request, *args, **kwargs)
        return wrapper
    return inner
