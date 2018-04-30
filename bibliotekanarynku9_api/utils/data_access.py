"""Module that contains utils represent data access layer."""

def get_object_or_none(model, query_args):
    """Function for getting one objects from db."""

    try:
        obj = model.objects.get(**query_args)
    except model.DoesNotExist:
        obj = None
    return obj
