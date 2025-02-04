from plone.app.upgrade.utils import loadMigrationProfile


def update_content_types(context):
    loadMigrationProfile(
        context,
        "profile-training:default",
        steps=["typeinfo"],
    )
